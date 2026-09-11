import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const urls = [
  "https://debracollege.ac.in/FacultyProfile.aspx?id=1",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=74",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=75",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=76",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=1246",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=78",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=170",
  "https://debracollege.ac.in/FacultyProfile.aspx?id=171"
];

async function scrapeProfile(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const name = $('#ctl00_Body_lblFacultyName').text().trim();
  if (!name) return null;

  const designation = $('#ctl00_Body_lblDesignation').text().trim();
  const department = $('#ctl00_Body_lblDepartment').text().trim();
  const qualification = $('#ctl00_Body_lblQualification').text().trim();
  const specialization = $('#ctl00_Body_lblSpecialization').text().trim();
  const research = $('#ctl00_Body_lblAreaOfResearch').text().trim();
  const mobile = $('#ctl00_Body_lblMobileNo').text().trim();
  const email = $('#ctl00_Body_lblEmail').text().trim();

  let details = "";
  if (department || mobile || email) {
    details += `### Contact Information\n`;
    if (department) details += `- **Department**: ${department}\n`;
    if (mobile) details += `- **Mobile No**: ${mobile}\n`;
    if (email) details += `- **Email**: ${email}\n`;
    details += `\n`;
  }

  if (qualification || specialization || research) {
    details += `### Academic Background\n`;
    if (qualification) details += `- **Educational Qualifications**: ${qualification}\n`;
    if (specialization) details += `- **Area of Specialization**: ${specialization}\n`;
    if (research) details += `- **Area of Research**: ${research}\n`;
    details += `\n`;
  }

  // Parse tables
  const tables = $('table.table-striped');
  tables.each((i, table) => {
    const theadText = $(table).find('thead th').first().text().trim();
    if (theadText && theadText.length > 0) {
       const rows = $(table).find('tbody tr');
       if (rows.length > 0) {
         details += `### ${theadText}\n`;
         const ths = $(table).find('thead tr').last().find('th');
         if (ths.length > 1) {
           // Markdown table
           const headers: string[] = [];
           ths.each((j, th) => headers.push($(th).text().trim().replace(/\|/g, '')));
           
           if (headers.length > 0) {
             details += `| ${headers.join(' | ')} |\n`;
             details += `| ${headers.map(() => '---').join(' | ')} |\n`;
             
             rows.each((j, row) => {
               const tds = $(row).find('td');
               const rowData: string[] = [];
               tds.each((k, td) => rowData.push($(td).text().trim().replace(/\|/g, '').replace(/\n/g, ' ')));
               // Pad with empty strings if row has fewer cells than header
               while (rowData.length < headers.length) rowData.push("");
               // Truncate if more
               details += `| ${rowData.slice(0, headers.length).join(' | ')} |\n`;
             });
             details += `\n`;
           }
         } else {
           // Simple list
           rows.each((j, row) => {
             details += `- ${$(row).text().trim().replace(/\n/g, ' ')}\n`;
           });
           details += `\n`;
         }
       }
    }
  });

  return {
    name,
    designation,
    specialization: specialization ? specialization : qualification,
    email,
    details: details.trim(),
    order: null
  };
}

async function main() {
  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    try {
      const data = await scrapeProfile(url);
      if (data) {
        const existing = await prisma.faculty.findFirst({ where: { name: data.name } });
        if (existing) {
          await prisma.faculty.update({
            where: { id: existing.id },
            data: { ...data, order: existing.order } // preserve order if it exists
          });
          console.log(`Updated ${data.name}`);
        } else {
          await prisma.faculty.create({ data });
          console.log(`Created ${data.name}`);
        }
      } else {
        console.log(`Failed to fetch data for ${url}`);
      }
    } catch (e) {
      console.error(`Error scraping ${url}:`, e);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
