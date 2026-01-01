// Client-side comments functions for browser use
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  updateDoc,
  Timestamp,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";

export interface Comment {
  id: string;
  name: string | null;
  service: string;
  comment: string;
  date: string;
  replies: Comment[];
}

const COMMENTS_COLLECTION = "comments";

// Convert Firestore timestamp to ISO string
function timestampToISOString(timestamp: any): string {
  if (timestamp?.toDate) {
    return timestamp.toDate().toISOString();
  }
  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }
  return timestamp || new Date().toISOString();
}

// Convert comment data from Firestore
function convertFirestoreComment(docData: any, id: string): Comment {
  return {
    id: id,
    name: docData.name || null,
    service: docData.service || "Diğer",
    comment: docData.comment || "",
    date: timestampToISOString(docData.date),
    replies: (docData.replies || []).map((reply: any, index: number) => ({
      id: reply.id || `${id}_reply_${index}`,
      name: reply.name || null,
      service: reply.service || "Yanıt",
      comment: reply.comment || "",
      date: timestampToISOString(reply.date),
      replies: []
    }))
  };
}

// Get all comments from Firestore
export async function getComments(): Promise<Comment[]> {
  try {
    if (!db) {
      console.error("Firestore not initialized");
      return [];
    }

    const commentsRef = collection(db, COMMENTS_COLLECTION);
    const q = query(commentsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    const comments: Comment[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      comments.push(convertFirestoreComment(data, docSnap.id));
    });
    
    return comments;
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
}

// Add a new comment to Firestore
export async function addComment(comment: Omit<Comment, "id" | "date">): Promise<string | null> {
  try {
    if (!db) {
      console.error("Firestore not initialized");
      return null;
    }

    console.log("Adding comment to Firestore:", comment);
    const commentsRef = collection(db, COMMENTS_COLLECTION);
    const commentData = {
      name: comment.name || null,
      service: comment.service,
      comment: comment.comment,
      date: Timestamp.now(),
      replies: []
    };
    console.log("Comment data to save:", commentData);
    
    const docRef = await addDoc(commentsRef, commentData);
    console.log("Comment added successfully with ID:", docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}

// Add a reply to a comment
export async function addReply(commentId: string, reply: Omit<Comment, "id" | "date" | "replies">): Promise<boolean> {
  try {
    if (!db) {
      console.error("Firestore not initialized");
      return false;
    }

    const commentRef = doc(db, COMMENTS_COLLECTION, commentId);
    const commentDoc = await getDoc(commentRef);

    if (!commentDoc.exists()) {
      console.error("Comment not found");
      return false;
    }

    const commentData = commentDoc.data();

    // Add the reply
    const replies = commentData.replies || [];
    replies.push({
      name: reply.name || null,
      service: reply.service || "Yanıt",
      comment: reply.comment,
      date: Timestamp.now()
    });

    await updateDoc(commentRef, {
      replies: replies
    });

    return true;
  } catch (error) {
    console.error("Error adding reply:", error);
    return false;
  }
}

