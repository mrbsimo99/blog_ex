import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">
                <Link to={`/articles/${article._id}`} className="text-blue-600 hover:underline">
                    {article.title}
                </Link>
            </h2>
            <p className="text-gray-700 mb-2">{article.content.slice(0, 150)}...</p>
            <small className="text-gray-500">
                By {article.author?.firstName} {article.author?.lastName}
            </small>
        </div>
    );
};

export default ArticleCard;
