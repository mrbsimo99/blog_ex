import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getComments, postComment } from "../services/api";
import CommentList from "../components/CommentList";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getArticleById(id).then((res) => setArticle(res.data.article));
    getComments(id).then((res) => setComments(res.data.docs));
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment) return;
    await postComment(id, newComment);
    const updated = await getComments(id);
    setComments(updated.data.docs);
    setNewComment("");
  };

  if (!article) return <p className="p-6">Caricamento...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700 mb-6">{article.content}</p>

      <h3 className="text-xl font-semibold mb-2">Commenti</h3>
      <CommentList comments={comments} />

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Scrivi un commento..."
      />
      <button
        onClick={handleAddComment}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Invia
      </button>
    </div>
  );
}

export default ArticleDetail;
