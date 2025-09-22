import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((res) => setArticles(res.data.docs));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">La tua Dashboard</h1>
      <p className="mb-4 text-gray-600">Qui puoi gestire gli articoli</p>

      {articles.length === 0 ? (
        <p className="text-gray-500">Nessun articolo trovato.</p>
      ) : (
        articles.map((a) => <ArticleCard key={a._id} article={a} />)
      )}
    </div>
  );
};

export default Dashboard;
