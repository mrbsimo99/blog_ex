function CommentList({ comments, currentUser, onDelete }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="p-4 bg-gray-50 border rounded-lg flex justify-between items-start"
        >
          <div>
            <p className="font-medium">{comment.user?.firstName || "Anonimo"}</p>
            <p className="text-gray-700">{comment.content}</p>
            <p className="text-gray-500 text-xs">
              {new Date(comment.createdAt).toLocaleDateString("it-IT")}
            </p>
          </div>

          {String(comment.user?._id) === String(currentUser?._id) && (
            <button
              onClick={() => onDelete(comment._id)}
              className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Elimina
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
