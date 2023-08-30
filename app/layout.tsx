import '@styles/globals.css'
import Nav from '@components/Navbar';

export const metadata = {
    title: "Onesta",
  };
  
  const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
          <div className='main'>
            <div className='gradient' />
          </div>
  
          <main className='app'>
            <Nav />
            {children}
          </main>
      </body>
    </html>
  );
  
  export default RootLayout;