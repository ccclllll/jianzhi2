// private Long id;
// private Double score;
// private String comment;
export class Score{
    id: number;
    score: number;
    comment: string;
    constructor(arg?:{
        id: number,
        score: number,
        comment: string,
    }){

        this.comment = arg.comment;
        this.score = arg.score;
        this.id = arg.id;
    }
}