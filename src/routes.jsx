import { RootLayout } from '@/components/layout/RootLayout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import About from '@/pages/About';
import Faq from '@/pages/Faq';
import Contact from '@/pages/Contact';
import Checkout from '@/pages/Checkout';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:slug', element: <CourseDetail /> },
      { path: 'about', element: <About /> },
      { path: 'faq', element: <Faq /> },
      { path: 'contact', element: <Contact /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
