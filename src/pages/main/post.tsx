import { Post as IPost } from "./main"
import { addDoc,deleteDoc, collection ,query, where ,getDocs,doc} from "firebase/firestore"
import { db , auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"



interface Props {
    post:IPost
}
interface Like{
    userId:string;
    likeId:string;
}

export const Post = (props:Props)=>{
    const {post} = props
    const likesRef = collection(db , "likes")
    const [user]=useAuthState(auth)
    const [likes , setLikes] = useState<Like[] | null >(null)
    const likesDoc=query(likesRef , where("postId","==" , post.id))
    const hasUserLiked = likes?.find((like)=>like.userId===user?.uid)

    const getLikes = async ()=>{
      const data = await getDocs(likesDoc)
      setLikes(data.docs.map((doc)=> ({userId: doc.data().userId , likeId:doc.id})))
    }
    const addLike= async ()=>{

        try{
      
       const newDoc= await addDoc(
                likesRef , {
               userId:user?.uid  ,
               postId: post.id
            }
        )
        if(user)
        setLikes((prev)=>prev ? [...prev, {userId:user?.uid , likeId:newDoc.id}] : [{userId:user?.uid , likeId:newDoc.id}])
        }
        catch(err){console.log(err)}
    } 



    const removeLike =async()=>{
        try{
            const likeToDeleteQuery=query(
                likesRef , 
                where("postId","==" , post.id) , 
                where("userId" , "==" ,user?.uid)
            )

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db , "likes" , likeId)
            await deleteDoc(likeToDelete)

            if(user)
            { 
                setLikes((prev)=>
                    prev && prev?.filter((like)=>like.likeId!==likeId))
            }
           }
     
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        getLikes()
    },[])
    
    return (
        <div className="post">
          <div className="post__title">
            <h1>{post.title}</h1>
          </div>
          <div className="post__body">
            <p>{post.description}</p>
          </div>
          <div className="post__footer">
            <p className="post__username">@{post.username}</p>
            <button
              onClick={hasUserLiked ? removeLike : addLike}
              className={hasUserLiked ? "post__like-button liked" : "post__like-button"}
            >
              {hasUserLiked ? <>&#128078; Unlike</> : <>&#128077; Like</>}
            </button>
            {likes && <p>{likes.length}</p>}
          </div>
        </div>
      );
      
}
