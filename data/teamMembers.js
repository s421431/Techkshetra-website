const teamMembers = [
  { 
    name: 'Rushika Khawas', 
    role: 'Student Coordinator', 
    imagePath: '/members/studentcoordinator1', 
    email: 'khawasrushika@gmail.com', 
    description: "I am a hard-working and driven individual who isn't afraid to face a challenge", 
    instagram: 'https://www.instagram.com/ru.uush_?igsh=MTIwdnBydHlnOGR4Mw==', 
    linkedin: 'https://www.linkedin.com/in/rushika-khawas-533083257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Sanskar Gaikwad', 
    role: 'Head Coordinator', 
    imagePath: '/members/headcoordinator', 
    email: 'sanskargaikwad206@gmail.com', 
    description: 'Developer mindset, Technical Enthusiast and Self-confident', 
    instagram: 'https://www.instagram.com/skar.og__?igsh=MWo0aDVoaDhrY3p4YQ==', 
    linkedin: 'https://www.linkedin.com/in/sanskar-gaikwad-295727306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Sakshi Ransing', 
    role: 'Student Coordinator', 
    imagePath: '/members/studentcoordinator2', 
    email: 'sakshiransing.28@gmail.com', 
    description: "Dedicated and driven person, with a strong commitment to excellence. My enthusiasm for learning and problem-solving fuels my continuous growthand achievement", 
    instagram: 'https://www.instagram.com/sakshi_ransing?igsh=dG83ZGc4N21yaDM0', 
    linkedin: null 
  },
  { 
    name: 'Chetna Patil', 
    role: 'Planning Head', 
    imagePath: '/members/planninghead2',
    description: 'A dedicated learner with a strong commitment to academic and personal growth. I manage my time effectively and excel in collaborative projects.', 
    instagram: null, 
    linkedin: null 
  },
  { 
    name: 'Osama Shaikh', 
    role: 'Planning Head', 
    imagePath: '/members/planning_head1',
    description: 'Diligent IT student with outstanding leadership skills and a strong work ethic. always ready to tackle challenges and support his peers.', 
    instagram: 'https://www.instagram.com/veer._.prince?igsh=MWd1ZWppMjVxcHU1Mg==', 
    linkedin: 'https://bit.ly/3Yzxv15' 
  },
  { 
    name: 'Sapana Sonavane', 
    role: 'Decoration Head', 
    imagePath: '/members/decorationhead2',
    description: "Work in a fast paced environment white maintaining accuracy of the work & the One who travels a lot", 
    instagram: 'https://www.instagram.com/_sapana_08s?igsh=eTZ0bGp0MWx5ajNm', 
    linkedin: 'https://linkedin.com/in/sapana' 
  },
  { 
    name: 'Ritika Chavan', 
    role: 'Decoration Head', 
    imagePath: '/members/decorationhead1',
    description: 'A frontend developer and huge creativity about decoration and designing skills', 
    instagram: 'https://www.instagram.com/ritz.1105?igsh=Z2gyY3k2dmRjbXEw', 
    linkedin: 'https://in.linkedin.com/in/ritika-chavan-6b070a2b6' 
  },
  { 
    name: 'Omkar Halpatrao', 
    role: 'Management Head', 
    imagePath: '/members/managementhead1',
    description: 'A dynamic and strategic leader with exceptional organizational and decision-making skills, driving successful management and operational excellence.', 
    instagram: 'https://www.instagram.com/omkar_______45/', 
    linkedin: 'https://www.linkedin.com/in/omkar-halpatrao-55968b26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Sumit Shrivastav', 
    role: 'Management Head', 
    imagePath: '/members/management2',
    description: 'I think positively and can execute on difficult tasks.', 
    instagram: 'https://www.instagram.com/sumit7782._?igsh=MWtqaGplbDJmaWw5cw==', 
    linkedin: 'https://www.linkedin.com/in/sumit-shrivastav-a287212bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Gaurav Mahajan', 
    role: 'Project and Technical Head', 
    imagePath: '/members/technicalandprojecthead',
    description: 'Trying to be better', 
    instagram: 'https://www.instagram.com/gaurav_abhiman_mahajan/?utm_source=qr&r=nametag', 
    linkedin: 'https://www.linkedin.com/in/gaurav-abhiman-mahajan-160353237/' 
  },
  { 
    name: 'Aditya Naikwadi', 
    role: 'Project Head', 
    imagePath: '/members/projecthead1',
    description:  "I’m passionate about staying up-to-date with the latest trends in technology, especially AI tools, which I love using for automation and productivity.", 
    instagram: 'https://www.instagram.com/__adi__naikwadi__?igsh=MWszcWxmemg2cTBmNg==', 
    linkedin: 'https://www.linkedin.com/in/ai-digital-2753a72a1 ' 
  },
  { 
    name: 'Aamir Khan', 
    role: 'Technical Head', 
    imagePath: '/members/technicalhead1',
    description: 'An athletic coder who combines strong programming skills with a commitment to physical fitness .', 
    instagram: 'https://www.instagram.com/heyaamirrr?igsh=MXJzZTYydjZpY2NxbQ==', 
    linkedin: 'https://www.linkedin.com/in/aamir-khan-6879a72ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Prajwal Sonawane', 
    role: 'Editing Head', 
    imagePath: '/members/editinghead2',
    description: 'Entrepreneur, Technical Enthusiast and Self-confident', 
    instagram: 'https://www.instagram.com/_prajwal.ds?igsh=MXZzZWEzemZnOWFkNg==', 
    linkedin: 'https://www.linkedin.com/in/prajwal-sonawane-672663283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Bhavarlal Kumavat', 
    role: 'Editing Head', 
    imagePath: '/members/editinghead1',
    description: ' Focused on money only, Always have snacks to eat in my bag', 
    instagram: 'https://www.instagram.com/the_marwadi._18?igsh=YnI4OXdlbm5ubnA=', 
    linkedin: 'https://www.linkedin.com/in/bhavarlal-kumavat-2b210928b' 
  },
  { 
    name: 'Mayur Khairnar', 
    role: 'Photography Head', 
    imagePath: '/members/photography',
    description: 'I have a positive mindset.', 
    instagram: 'https://www.instagram.com/mayur__.k?igsh=MXd0cXRpOXQzODcyaA==', 
    linkedin: 'https://in.linkedin.com/in/mayur-khairnar-96b060322'
  },
  { 
    name: 'Mandar Dongre', 
    role: 'Social Media', 
    imagePath: '/members/socialmediahead1',
    description: "Breaking barriers and rewriting the rules of technology—I'm the future.", 
    instagram: 'https://www.instagram.com/d_diligent_?igsh=MXJuOWszcnN1cWM2aQ==', 
    linkedin: 'https://www.linkedin.com/in/mandar-dongare-32126728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Aryan Nalge', 
    role: 'Social Media', 
    imagePath: '/members/socialmediahead2',
    description: 'Explorer, Car Enthusiast', 
    instagram: 'https://www.instagram.com/aryannalge?igsh=emZ6NGZlYmJ1NHd6', 
    linkedin: 'https://www.linkedin.com/in/aryan-nalge-b0681b283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Raina Mishra', 
    role: 'Reporting Head', 
    imagePath: '/members/reportinghead2',
    description: 'A passionate learner and achiever, always eager to explore, participate, and excel in all pursuits.', 
    instagram: 'https://www.instagram.com/miss_riya_101234?igsh=ZnVuMHpnZW1kZnlj', 
    linkedin: 'https://www.linkedin.com/in/raina-mishra-26a10728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Sanjana Patil', 
    role: 'Reporting Head', 
    imagePath: '/members/reportinghead1',
    description: 'As a creative and determined professional, I thrive on transforming challenges into opportunities.', 
    instagram: 'https://www.instagram.com/giggless_here?igsh=NWJmanVxem9mdnc5', 
    linkedin: 'https://www.linkedin.com/in/sanjana-patil-695663283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Riya Jamdar', 
    role: 'PR Head', 
    imagePath: '/members/prhead2',
    description: 'Enthusiastic about doing artistic stuff. Enjoy creating my own designs and front-end programming. Creative Mind.', 
    instagram: 'https://www.instagram.com/invites/contact/?igsh=14h8wcd1m6p5s&utm_content=373atz0', 
    linkedin: 'https://www.linkedin.com/in/riya-jamdar-778b7331a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Girish Chede', 
    role: 'PR Head', 
    imagePath: '/members/prhead1',
    description: 'Crafting Innovative blockchain Solutions , Problem Solver', 
    instagram: 'https://www.instagram.com/girishchede_?igsh=MXNydTMyd3FxNXRqMQ==', 
    linkedin: 'https://www.linkedin.com/in/girish-chede?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
  },
  { 
    name: 'Harshad Jadhav', 
    role: 'Security Head', 
    imagePath: '/members/securityhead2',
    description: "A hard-working and driven individual who isn't afraid to face a challenge. I'm passionate about my work and I know how to get the job done.", 
    instagram: 'https://www.instagram.com/harshad__jadhav__', 
    linkedin: 'http://www.linkedin.com/in/harshad-jadhav-b9969a231' 
  }
];

export default teamMembers;
