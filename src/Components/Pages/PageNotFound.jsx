import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/Pnf.css"

const PageNotFound = () => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="text-center hello1">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center ">404</h1>
                        </div>

                        <div className="contant_box_404">
                            <h3 className="h2">
                                Look like you're lost
                            </h3>

                            <p>the page you are looking for not avaible or login first!</p>
                            <Link to="/" className="link_404">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound