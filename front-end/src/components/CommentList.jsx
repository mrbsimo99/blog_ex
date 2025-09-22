const CommentList = ({ comments }) => {
    return (
        <div className="mt-4">
            {comments.map((c) => (
                <div key={c._id} className="border-b py-2">
                    <p>
                        <span className="font-semibold">{c.user?.firstName}:</span> {c.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
