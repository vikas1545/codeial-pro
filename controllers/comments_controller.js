const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res) {
   Post.findById(req.body.post,function(err,post){

    if(post) {
        Comment.create({
            content: req.body.content,
            post:req.body.post,
            user:req.user._id
        },function(err,comment) {
            if(err) {
                console.log("Something went Wrong in creating comments.....");
                return;
            }

            post.comments.push(comment);
            
            //Whenever we are updating something we need to call save()
            post.save();

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post Created!"
                });
            }

            req.flash('success', 'comment published');
            res.redirect('/');

        });
    }
   });
}

module.exports.destroy = function(req,res) {
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id) {
            
            let postId = comment.post;
            comment.remove();
            
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    });
}

