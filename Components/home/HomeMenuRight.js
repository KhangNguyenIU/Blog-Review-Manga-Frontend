import Link from "next/link"
const HomeMenuRight = ({ blogs, categories }) => {

    return (
        <div className="home-menu-right">
            <div className="menu-category">
                <p className="section-text-primary">Categories</p>
                <div className="menu-category-list top-margin-2">
                    {
                        categories && categories.map((cate, index) => (
                            <div key={index} className="button-teriary">
                                <Link href="/">
                                    {cate.name}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default HomeMenuRight;