import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getComments, postComment, deleteComment } from "../services/api";
import CommentList from "../components/CommentList";

function ArticleDetail({ currentUser }) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleRes = await getArticleById(id);
        setArticle(articleRes.data.article);

        const commentsRes = await getComments(id);
        setComments(commentsRes.data.docs);
      } catch (error) {
        console.error("Errore nel caricamento articolo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await postComment(id, newComment.trim());
      const updatedComments = await getComments(id);
      setComments(updatedComments.data.docs);
      setNewComment("");
    } catch (error) {
      console.error("Errore nell'invio del commento:", error);
      alert("Impossibile inviare il commento. Riprova più tardi.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = await getComments(id);
      setComments(updatedComments.data.docs);
    } catch (error) {
      console.error("Errore nell'eliminazione del commento:", error);
      alert("Impossibile eliminare il commento. Riprova più tardi.");
    }
  };

  if (loading) return <p className="p-6">Caricamento...</p>;
  if (!article) return <p className="p-6">Articolo non trovato.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
        <p className="text-gray-700 mb-3">{article.content}</p>
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
          <span>Categoria: {article.category?.name || "N/D"}</span>
          <span>Tags: {article.tags?.map(tag => tag.name).join(", ") || "N/D"}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Commenti</h3>
      <CommentList comments={comments} currentUser={currentUser} onDelete={handleDeleteComment} />

      <div className="flex mt-4 gap-2 items-end">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Scrivi un commento..."
          rows={3}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Invia
        </button>
      </div>
    </div>
  );
}

export default ArticleDetail;
