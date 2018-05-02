export
const createNewComment = (myComment) =>
	`
	<div class="row">
	    <article class="comment-block">
	      <div class="read-comment">
	        <div class="row">
	          <div class="comment-user">
	            <div class="user-img"></div>
	            <h6>${myComment.author}</h6>
	          </div>
	          <div class="comment-text">
	            <p>${myComment.content}</p>
	          </div>
	        </div>
	        <div class="row">
	          <div class="comment-reaction">
	            <div>
	              <i class="fas fa-star fa-2x"></i>
	              <p>84</p>
	            </div>
	            <div>
	              <i class="fas fa-comments fa-2x"></i>
	              <p>Comment</p>
	            </div>
	            <div>
	              <i class="fas fa-paper-plane fa-2x"></i>
	              <p>Message</p>
	            </div>
	            <div>
	              <i class="fas fa-exclamation-circle fa-2x"></i>
	              <p>Report</p>
	            </div>
	          </div>
	        </div>
	      </div>
	    </article>
	  </div>
	`