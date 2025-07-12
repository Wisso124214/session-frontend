import time_weave_logo from '@assets/time-weave-logo.png';
import ink_flow_logo from '@assets/ink-flow-logo.jpg';

const config = {
  BACKEND_URL: 'http://localhost:3030',
  PROJECTS_URL: [{
    name: 'Time Weave',
    url: 'http://localhost:3008',
    logo: time_weave_logo,
  }, 
  {
    name: 'Ink Flow',
    url: 'http://localhost:3005',
    logo: ink_flow_logo,
  }
  ],
  FRONTEND_URL: 'http://localhost:3010',
}

export default config;