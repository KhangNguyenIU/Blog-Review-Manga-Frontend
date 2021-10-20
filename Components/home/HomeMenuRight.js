import Link from "next/link"
const HomeMenuRight = ({ blogs, categories }) => {

    return (
        <div className="home-menu-right">
            <div className="menu-category">
                <p className="section-text-primary">Categories</p>
                <div className="menu-category-list top-margin-2">
                    {
                        categories && categories.map((cate, index) => (
                            <div key={index} className="button-outlined-small">
                                <Link href="/">
                                    {cate.name}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* <div className="menu-recent-post">
                <p className="section-text-primary">Recent Post</p>

                <ul className="recent-post-list">
                    <li>
                        <div className="recent-post">
                            <div className="recent-post-image">
                                <img src="https://images.unsplash.com/photo-1632580384542-c0d49b49a92e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80" />
                            </div>

                            <div className="recent-post-info">
                                <p>
                                    Post Format: Standard
                                </p>

                                <span className="card-date">
                                    - 05 Oct, 2016
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div> */}
        </div>
    )
}

export default HomeMenuRight;