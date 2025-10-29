import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showHamburger, setShowHamburger] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowHamburger(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowHamburger(false);
    }
  }, [isOpen]);

  return (
    <>
      {showHamburger && (
        <Button
          data-role='sidebar-hamburger-button'
          onClick={toggleSidebar}
          className='animate-in fade-in fixed top-6 left-4 z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full bg-white p-2 duration-300 hover:bg-gray-100'
          variant='ghost'
          size='icon'
        >
          <span
            data-role='hamburger-line'
            className='h-0.5 w-6 rounded bg-black'
          />
          <span
            data-role='hamburger-line'
            className='h-0.5 w-6 rounded bg-black'
          />
          <span
            data-role='hamburger-line'
            className='h-0.5 w-6 rounded bg-black'
          />
        </Button>
      )}

      <aside
        data-role='sidebar-container'
        className={cn(
          'fixed top-0 left-0 z-[10] h-dvh bg-[#0A0F14] py-6 transition-[width] duration-300',
          isOpen ? 'w-full sm:w-[17.5rem]' : 'w-0 overflow-hidden',
        )}
      >
        <div
          data-role='sidebar-content-wrapper'
          className={cn('transition-opacity duration-150', isOpen ? 'opacity-100' : 'opacity-0')}
        >
          <header
            data-role='sidebar-header'
            className='relative flex w-full flex-nowrap items-center justify-center gap-9 px-4'
          >
            <h1
              data-role='sidebar-logo-text'
              className='text-[1.5rem] leading-normal font-bold whitespace-nowrap text-white'
            >
              Solvion
            </h1>

            <button
              data-role='sidebar-close-button'
              onClick={toggleSidebar}
              className='absolute top-1/2 right-4 flex max-h-6 min-h-6 max-w-6 min-w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-200'
              type='button'
            >
              <span
                data-role='close-icon'
                className='text-sm font-bold text-[#0A0F14]'
              >
                ×
              </span>
            </button>
          </header>
          <nav
            data-role='sidebar-navigation-section'
            className='mt-52 flex flex-nowrap items-center'
          >
            <ul
              data-role='sidebar-navigation'
              className='flex w-full flex-col'
            >
              <li data-role='nav-item-dashboard'>
                <Link
                  to='/painel'
                  className={cn(
                    'flex cursor-pointer flex-nowrap items-center gap-2 px-4 py-4 text-[1.25rem] leading-normal font-normal whitespace-nowrap transition-all duration-200 hover:pl-6',
                    location.pathname === '/painel'
                      ? 'bg-gray-800 text-[#68C8AE]'
                      : 'text-white hover:bg-gray-800 hover:text-[#68C8AE]',
                  )}
                >
                  <span
                    data-role='nav-item-icon'
                    className='max-h-6 min-h-6 max-w-6 min-w-6 rounded-full bg-white'
                  />
                  Dashboard
                </Link>
              </li>
              <li data-role='nav-item-creatives'>
                <Link
                  to='/criativos'
                  className={cn(
                    'flex cursor-pointer flex-nowrap items-center gap-2 px-4 py-4 text-[1.25rem] leading-normal font-normal whitespace-nowrap transition-all duration-200 hover:pl-6',
                    location.pathname === '/criativos'
                      ? 'bg-gray-800 text-[#68C8AE]'
                      : 'text-white hover:bg-gray-800 hover:text-[#68C8AE]',
                  )}
                >
                  <span
                    data-role='nav-item-icon'
                    className='max-h-6 min-h-6 max-w-6 min-w-6 rounded-full bg-white'
                  />
                  Geração de criativos
                </Link>
              </li>
              <li data-role='nav-item-campaigns'>
                <Link
                  to='/campanhas'
                  className={cn(
                    'flex cursor-pointer flex-nowrap items-center gap-2 px-4 py-3 text-[1.25rem] leading-normal font-normal whitespace-nowrap transition-all duration-200 hover:pl-6',
                    location.pathname === '/campanhas'
                      ? 'bg-gray-800 text-[#68C8AE]'
                      : 'text-white hover:bg-gray-800 hover:text-[#68C8AE]',
                  )}
                >
                  <span
                    data-role='nav-item-icon'
                    className='max-h-6 min-h-6 max-w-6 min-w-6 rounded-full bg-white'
                  />
                  Campanhas
                </Link>
              </li>
              <li data-role='nav-item-profile'>
                <Link
                  to='/perfil'
                  className={cn(
                    'flex cursor-pointer flex-nowrap items-center gap-2 px-4 py-3 text-[1.25rem] leading-normal font-normal whitespace-nowrap transition-all duration-200 hover:pl-6',
                    location.pathname === '/perfil'
                      ? 'bg-gray-800 text-[#68C8AE]'
                      : 'text-white hover:bg-gray-800 hover:text-[#68C8AE]',
                  )}
                >
                  <span
                    data-role='nav-item-icon'
                    className='max-h-6 min-h-6 max-w-6 min-w-6 rounded-full bg-white'
                  />
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>

          <div
            data-role='sidebar-theme-toggle'
            className='absolute bottom-6 left-0 w-full px-4 select-none'
          >
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              className='flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-3 transition-colors hover:bg-gray-700'
            >
              <span className='text-sm font-normal text-white'>☀️</span>
              <Switch
                id='theme-toggle'
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className={cn(!isDarkMode && 'border border-gray-300')}
              />
              <span className='text-sm font-normal text-white'>🌙</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export { Sidebar };
