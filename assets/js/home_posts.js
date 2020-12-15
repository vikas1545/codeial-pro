{
    // Method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                //  serialize() convert in JSON format
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    // Method to create a post in DOM

    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                <p>               
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
                    </small>
                ${post.content} 
                <br>
                <small>${post.user.name}</small>
                </p>
            
                <div class="post-comments">
                    
                        <form action="/comments/create" method="POST">
                         <input type="text" name="content" placeholder="Type here to add comment..." required>
                         <input type="hidden" name="post" value="${post._id}">
                         <input type="submit" value="Add Comment">   
                        </form>
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                       </ul>
                    </div>    
                </div>
            </li>`)
    }

    // Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                // JQuery prop(property) method sets or returns properties and values of the selected elements.
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}

// *************************  Adding Comments and deleting ********************************************
{
    // Method to submit the form data for new Comment using AJAX
    let createComment = function () {
        let newCommentForm = $('#comment-form');
        console.log(newCommentForm); 
        newCommentForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                //  serialize() convert in JSON format
                data: newCommentForm.serialize(),
                success: function (data) {
                    console.log("DATA:::", data);
                    console.log(data.data.comment.content);
                    let newComment = newCommentDom(data.data.comment);

                    console.log("NEWCOMMENT", newComment);
                    $('#post-comments-list>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    // Method to create a Comment in DOM

    let newCommentDom = function (comment) {
        return $(`<li id="post-comment-${comment._id}">
                <p>               
                    <small>
                        <a class="delete-post-button" href="/comments/destroy/${comment._id}">Delete Post</a>
                    </small>
                ${comment.content} 
                <br>
                <small>${comment.user.name}</small>
                </p>
            
            
             </li>`)
    }

    // Method to delete a comment from DOM
    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                // JQuery prop(property) method sets or returns properties and values of the selected elements.
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-comment${data.data.comment_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    createComment();
}
