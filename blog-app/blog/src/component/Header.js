import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header >
      <div className='container flex justify-between align-center'>
        <NavLink to='/' style={{ fontSize: '2rem', fontWeight: '700', color: 'tomato' }}><i className="fa-sharp fa-solid fa-blog"></i>BLOG</NavLink>
        <nav className='flex'>
          <li><NavLink to='/' activeclassname='active'>HOME</NavLink></li>
          <li> <NavLink to='/signin' activeclassname='active'>SIGN IN</NavLink></li>
          <li> <NavLink to='/signup' activeclassname='active'>SIGN UP</NavLink></li>
        </nav>
      </div>
    </header>
  )
}