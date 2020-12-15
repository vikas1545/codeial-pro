
const Post = require('../models/post');
const User = require('../models/user');

// ***********populate the user of each post by using Async ,await & Error handling *************
try {

    module.exports.home = async function (req, res) {

        let posts = await Post.find({})
            // .sort('-createdAt') is a mongodb function
            .sort('-createdAt')
            .populate('user')
            .populate({
                // Here path is used because of array of comments 
                path: 'comments',
                options:{sort:'-createdAt'}, // 
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});
        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });
    }
} catch (err) {
    console.log("Error", err);
}

//***************** populate the user of each post ******************

// module.exports.home = function(req, res){

  //  populate() is used to fetch data for referenced documents from other collections
  // exec() is execute
//     Post.find({}).populate('user')

//     .populate({path:'comments', // Here path is used because of array of comments
//     populate:{path:'user'}})

//     .exec(function(err,posts){ 

//         User.find({},function(err,users){
//             return res.render('home',{
//                 title:"Codial | Home",
//                 posts:posts,
//                 all_users:users
//             });
//         });
//     });
// }




