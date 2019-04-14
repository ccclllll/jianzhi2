import {Job} from "./Job";
import {User} from "./User";
import {Score} from "./score";

export class UserJob{
    id: number;
    job: Job;
    user: User;
    state: number;
    score: Score;
    constructor(arg?:{
        id: number,
        job: Job,
        user: User,
        state: number,
        score: Score
    }){
        this.id = arg.id;
        this.job = arg.job;
        this.user = arg.user;
        this.state = arg.state;
        this.score = arg.score;
    }
}
// private Long id;
// @ManyToOne
// private Job job;
// @ManyToOne
// User user;
// private Integer state; // 0 未开始 1进行中 2已结束
//
// private Double score;