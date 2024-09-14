import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LectureComments = ({ lectureId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyCommentId, setReplyCommentId] = useState(null); // For replying to a specific comment

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comment/${lectureId}/comments`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [lectureId]);

  // Handle adding a new comment or a reply
  const handleAddComment = async () => {
    try {
      await axios.post(`/api/comment/${lectureId}/comment`, {
        content: newComment,
        parentCommentId: replyCommentId,
      }, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      setNewComment('');
      setReplyCommentId(null);
      alert('Comment added');
      // Re-fetch the comments after adding a new one
      const response = await axios.get(`/api/comment/${lectureId}/comments`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setComments(response.data);
    } catch (error) {
      console.error(error);
      alert('Error adding comment');
    }
  };

  // Function to handle replying to a comment
  const handleReply = (commentId) => {
    setReplyCommentId(commentId);
  };

  return (
    <div>
      <h3>Lecture Comments</h3>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} style={{ marginLeft: comment.parentCommentId ? '20px' : '0' }}>
            <p><strong>{comment.user.name}</strong>: {comment.content}</p>
            <button onClick={() => handleReply(comment._id)}>Reply</button>

            {/* Nested replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div style={{ marginLeft: '20px' }}>
                {comment.replies.map((reply) => (
                  <div key={reply._id}>
                    <p><strong>{reply.user.name}</strong>: {reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment here..."
        />
        <button onClick={handleAddComment}>
          {replyCommentId ? 'Reply to Comment' : 'Add Comment'}
        </button>
      </div>
    </div>
  );
};

export default LectureComments;

