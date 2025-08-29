export const jobs = [
  {
    id: 1,
    title: "Backend Engineer (Node.js / PostgreSQL)",
    description: `# ⚡ Backend Engineer – Node.js / PostgreSQL

We are looking for a **Backend Engineer** who loves designing robust APIs, managing large-scale databases, and ensuring applications run like clockwork.  

---

## 📌 About the Role
You will be working on building APIs, managing cloud infrastructure, and ensuring the backend systems can scale to support thousands of users.  
Expect challenges like **performance optimization, database modeling, and designing fault-tolerant systems**.  

---

## 🔧 Responsibilities
- Architect and develop REST/GraphQL APIs using **Node.js**  
- Write optimized SQL queries for **PostgreSQL**  
- Integrate third-party APIs and services  
- Implement authentication & authorization (JWT, OAuth)  
- Ensure high availability, scalability, and security of backend systems  
- Debug, test, and maintain backend services in production  
- Collaborate with DevOps on CI/CD pipelines  

---

## 🎯 Requirements
- Strong proficiency in **JavaScript/TypeScript (Node.js)**  
- Solid understanding of **PostgreSQL and relational database design**  
- Experience with **Supabase or Firebase** is a big plus  
- Familiarity with **Docker and containerized environments**  
- Knowledge of cloud infrastructure (AWS, GCP, or Azure)  
- Understanding of authentication protocols (JWT, OAuth, SAML)  

---

## 💡 Nice-to-Have
- Knowledge of **Redis, RabbitMQ, Kafka**  
- Hands-on with **Kubernetes**  
- Prior experience in **microservices architecture**  

---

## 🌍 Work Culture
- Fully **remote-friendly**  
- Pair programming & mentorship-driven environment  
- Strong emphasis on **code quality and testing**  
- Monthly learning sessions  

---

## 🎁 Perks & Benefits
- Competitive salary + equity options  
- Health insurance + mental health allowance  
- Paid time off + flexible work hours  
- Yearly tech stipend for hardware/software  

---

**Location:** Hybrid (Bangalore, India) / Remote option available  
**Employment Type:** Full-time  
**Experience Level:** 2–5 years  

---

> If backend scalability, database design, and API performance excite you, this is the right place for you! 🚀`,
    is_active: true,
    fields: [
      {"name": "full_name", "label": "Full Name", "type": "text", "required": true},
      {"name": "email", "label": "Email Address", "type": "email", "required": true},
      {"name": "linkedin", "label": "LinkedIn Profile", "type": "text", "required": false},
      {"name": "github", "label": "GitHub / Portfolio", "type": "text", "required": false},
      {"name": "experience", "label": "Years of Backend Experience", "type": "number", "required": true},
      {"name": "preferred_language", "label": "Preferred Backend Language", "type": "radio", "options": ["Node.js", "Python", "Go", "Java"], "required": true},
      {"name": "db_experience", "label": "Databases You Have Worked With", "type": "checkbox", "options": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra"], "required": true},
      {"name": "resume", "label": "Upload Resume (PDF)", "type": "file", "required": true},
      {"name": "cover_letter", "label": "Cover Letter", "type": "textarea", "required": false},
      {"name": "expected_salary", "label": "Expected Salary (INR per annum)", "type": "number", "required": false},
      {"name": "availability", "label": "Notice Period", "type": "select", "options": ["Immediate", "2 Weeks", "1 Month", "More than 1 Month"], "required": true}
    ]
  },
  {
    id: 2,
    title: "Frontend Engineer (React / TypeScript)",
    description: `# ⚡ Frontend Engineer – React / TypeScript

We are looking for a **Frontend Engineer** who loves creating beautiful, responsive user interfaces and delivering exceptional user experiences.  

---

## 📌 About the Role
You will be working on building modern web applications, creating reusable components, and ensuring seamless user interactions.  
Expect challenges like **performance optimization, state management, and creating pixel-perfect responsive designs**.  

---

## 🔧 Responsibilities
- Build modern web applications using **React & TypeScript**  
- Create reusable UI components and design systems  
- Implement responsive designs that work across all devices  
- Optimize applications for maximum speed and scalability  
- Collaborate with designers to translate mockups into code  
- Write clean, maintainable, and well-tested code  

---

## 🎯 Requirements
- Strong proficiency in **React, TypeScript, and modern JavaScript**  
- Experience with **CSS3, SASS/SCSS, and responsive design**  
- Knowledge of state management (Redux, Zustand, or Context API)  
- Familiarity with **Next.js or other React frameworks**  
- Understanding of modern build tools (Vite, Webpack)  
- Experience with version control (Git) and collaborative workflows  

---

## 💡 Nice-to-Have
- Experience with **Tailwind CSS or styled-components**  
- Knowledge of **GraphQL and Apollo Client**  
- Familiarity with **testing frameworks (Jest, React Testing Library)**  

---

**Location:** Hybrid (Bangalore, India) / Remote option available  
**Employment Type:** Full-time  
**Experience Level:** 2–5 years`,
    is_active: true,
    fields: [
      {"name": "full_name", "label": "Full Name", "type": "text", "required": true},
      {"name": "email", "label": "Email Address", "type": "email", "required": true},
      {"name": "linkedin", "label": "LinkedIn Profile", "type": "text", "required": false},
      {"name": "portfolio", "label": "Portfolio / Website", "type": "text", "required": false},
      {"name": "experience", "label": "Years of Frontend Experience", "type": "number", "required": true},
      {"name": "frameworks", "label": "Frontend Frameworks Experience", "type": "checkbox", "options": ["React", "Vue.js", "Angular", "Svelte", "Next.js"], "required": true},
      {"name": "css_skills", "label": "CSS & Styling Experience", "type": "checkbox", "options": ["Tailwind CSS", "SASS/SCSS", "Styled Components", "CSS Modules", "Bootstrap"], "required": true},
      {"name": "resume", "label": "Upload Resume (PDF)", "type": "file", "required": true},
      {"name": "cover_letter", "label": "Cover Letter", "type": "textarea", "required": false},
      {"name": "expected_salary", "label": "Expected Salary (INR per annum)", "type": "number", "required": false},
      {"name": "availability", "label": "Notice Period", "type": "select", "options": ["Immediate", "2 Weeks", "1 Month", "More than 1 Month"], "required": true}
    ]
  },
  {
    id: 3,
    title: "DevOps Engineer (AWS / Docker)",
    description: `# ⚡ DevOps Engineer – AWS / Docker

We are looking for a **DevOps Engineer** who loves automating deployments, managing cloud infrastructure, and ensuring system reliability.  

---

## 📌 About the Role
You will be working on building CI/CD pipelines, managing cloud infrastructure, and ensuring our applications run smoothly in production.  
Expect challenges like **infrastructure automation, monitoring, and scaling applications**.  

---

## 🔧 Responsibilities
- Design and manage **AWS cloud infrastructure**  
- Build and maintain **CI/CD pipelines**  
- Containerize applications using **Docker and Kubernetes**  
- Monitor system performance and troubleshoot issues  
- Implement security best practices and compliance  
- Automate deployment processes and infrastructure provisioning  

---

## 🎯 Requirements
- Strong experience with **AWS services (EC2, S3, RDS, Lambda)**  
- Proficiency in **Docker and container orchestration**  
- Experience with **CI/CD tools (GitHub Actions, Jenkins, GitLab CI)**  
- Knowledge of **Infrastructure as Code (Terraform, CloudFormation)**  
- Understanding of **Linux/Unix systems and shell scripting**  
- Experience with monitoring tools (CloudWatch, Prometheus, Grafana)  

---

## 💡 Nice-to-Have
- **Kubernetes** experience  
- Knowledge of **security scanning and compliance tools**  
- Experience with **microservices architecture**  

---

**Location:** Hybrid (Bangalore, India) / Remote option available  
**Employment Type:** Full-time  
**Experience Level:** 3–6 years`,
    is_active: true,
    fields: [
      {"name": "full_name", "label": "Full Name", "type": "text", "required": true},
      {"name": "email", "label": "Email Address", "type": "email", "required": true},
      {"name": "linkedin", "label": "LinkedIn Profile", "type": "text", "required": false},
      {"name": "github", "label": "GitHub Profile", "type": "text", "required": false},
      {"name": "experience", "label": "Years of DevOps Experience", "type": "number", "required": true},
      {"name": "cloud_platforms", "label": "Cloud Platforms Experience", "type": "checkbox", "options": ["AWS", "Google Cloud", "Azure", "DigitalOcean"], "required": true},
      {"name": "tools_experience", "label": "DevOps Tools Experience", "type": "checkbox", "options": ["Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins"], "required": true},
      {"name": "resume", "label": "Upload Resume (PDF)", "type": "file", "required": true},
      {"name": "cover_letter", "label": "Cover Letter", "type": "textarea", "required": false},
      {"name": "expected_salary", "label": "Expected Salary (INR per annum)", "type": "number", "required": false},
      {"name": "availability", "label": "Notice Period", "type": "select", "options": ["Immediate", "2 Weeks", "1 Month", "More than 1 Month"], "required": true}
    ]
  }
];
