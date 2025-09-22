import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res.data.docs);
    });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {articles.map((a) => (
        <ArticleCard key={a._id} article={a} />
      ))}
    </div>
  );
}

export default Home;
