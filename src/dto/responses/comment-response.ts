import { CommentMediaModel, CommentModel } from "../../model/comment.model";


export type CommentResponse = {
    comment: CommentModel;
    commentMedia?: CommentMediaModel[];
}