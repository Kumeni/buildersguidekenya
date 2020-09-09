import ArticleContent from '../components/Article/articleContent/articleContent'
import style from '../components/Article/article.module.css'
import FeaturedImage from '../components/Article/featuredImage/featuredImage'
import ArticleTitle from '../components/Article/articleTitle/articleTitle'

export default function Article() {
    return (
        <div className={'container'}>
            
            <FeaturedImage />
            <ArticleContent />
            <div>
                Author
            </div>
            <a href='back'>Back</a>
            <div>
                Footer
            </div>
        </div>
    )
}
