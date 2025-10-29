import { Outlet } from 'react-router-dom';
import { Sidebar } from './_parts/Sidebar';
import { ParticleAnimation } from '@/components/ParticleAnimation';

export default function DefaultLayout() {
  return (
    <div
      data-role=''
      className='default-layout__wrapper relative flex'
    >
      <ParticleAnimation className='-z-[1] h-full w-full' />
      <Sidebar />
      <Outlet />
    </div>
  );
}
