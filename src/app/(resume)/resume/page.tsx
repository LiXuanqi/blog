// export default function ResumePage() {
//     return (
//       <div className="container mx-auto mt-8">
//         <h1 className="text-3xl font-bold">Resume</h1>
//         <p className="mt-4">Heres my professional experience and skills.</p>
//       </div>
//     )
//   }

import { loadResumeData } from "@/lib/yaml";

const ResumeSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h2 className="uppercase border-b-[1px] border-solid border-black font-semibold font-['Roboto_Slab_Variable']">
        {title}
      </h2>
      {children}
    </div>
  );
};
interface ResumeItemProps {
  title: string;
  location: string;
  time: string;
  desc: string[];
}

const ResumeItem = ({ title, location, time, desc }: ResumeItemProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex flex-row items-center">
            <h3 style={{ fontWeight: 700, fontSize: "110%" }}>{title}</h3>
          </div>
          <span>{location}</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: "110%" }}>
          <span>{time}</span>
        </div>
      </div>
      <ul className="list-disc pl-8">
        {desc.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </div>
  );
};
// const ResumeSkillRow = ({
//   category,
//   items
// }: {
//   category: string;
//   items: string[];
// }) => {
//   return (
//     <div className="flex">
//       <span
//         style={{
//           fontWeight: "bold",
//           textTransform: "capitalize",
//           marginRight: "6px",
//         }}
//       >
//         {category}:
//       </span>
//       <p>{items.join(", ")}</p>
//     </div>
//   );
// };

export default function ResumePage() {
  const resume = loadResumeData();
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[8.5in] mx-auto p-8 bg-white">
        <div>
          <h1 className="text-4xl font-semibold text-center mb-4">
            {resume.name}
          </h1>
          <div className="text-center mb-2">
            <span>{resume.address} | </span>
            <span>{resume.tel} | </span>
            <span>{resume.email}</span>
          </div>
          <div className="text-center mb-6">
            <a href={`http://${resume.github}`} className="hover:underline">
              {resume.github}
            </a>
            <span> | </span>
            <a href={`http://${resume.linkedin}`} className="hover:underline">
              {resume.linkedin}
            </a>
            <span> | </span>
            <a href={`http://${resume.blog}`} className="hover:underline">
              {resume.blog}
            </a>
          </div>

          <ResumeSection title="Education">
            {resume.education.map((university, index) => (
              <ResumeItem
                key={index}
                location=""
                title={university.name}
                time={university.time}
                desc={university.desc}
              />
            ))}
          </ResumeSection>

          {/* <ResumeSection title="Skills">
            {Object.entries(resume1.skills).map(([category, items]) => (
              <ResumeSkillRow
                key={category}
                category={category}
                items={items}
              />
            ))}
          </ResumeSection> */}

          <ResumeSection title="Work Experience">
            {resume.workExperience.map((job, index) => (
              <ResumeItem
                key={index}
                title={`${job.company}, ${job.position}`}
                time={job.time}
                location={job.location}
                desc={job.desc}
              />
            ))}
          </ResumeSection>

          <ResumeSection title="Projects">
            {resume.projects.map((project, index) => (
              <ResumeItem
                key={index}
                location=""
                time=""
                title={project.name}
                desc={project.desc}
              />
            ))}
          </ResumeSection>
        </div>
      </div>
    </div>
  );
}
