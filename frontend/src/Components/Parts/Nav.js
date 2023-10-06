import React, { useEffect, useState } from 'react'
import { getUser } from '../../Common'

const Nav = () => {
  const searchParams = new URLSearchParams(document.location.search)

  function logout() {
    localStorage.clear()
    window.location.reload()
  }

  const [query, setQuery] = useState(null)

  useEffect(() => {
    setQuery(searchParams.get('q'))
  }, [])

  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="index.html"><img src="/static/images/logo.svg" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="index.html"><img src="/static/images/logo-mini.svg"
            alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">

          <div className="search-field d-none d-xl-block">
            <form className="d-flex align-items-center h-100"
            >
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text"
                  className="form-control bg-transparent border-0"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documents" />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">

            {getUser() && (

              <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown"
                  aria-expanded="false">
                  <div className="nav-profile-img">
                    <img src="/static/images/faces/face28.png" alt="image" />
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">{getUser().email}</p>
                  </div>
                </a>
                <div className="dropdown-menu navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm"
                  aria-labelledby="profileDropdown" data-x-placement="bottom-end">

                  <div className="p-2">

                    <a className="dropdown-item py-1 d-flex align-items-center justify-content-between" href="#"
                      onClick={logout}
                    >
                      <span>Log Out</span>
                      <i className="mdi mdi-logout ml-1"></i>
                    </a>
                  </div>
                </div>
              </li>
            )
            }
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
            data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Nav