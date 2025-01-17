import { SetLineupNameCsReq, SetLineupNameScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as SetLineupNameCsReq;

    let curLineup = await session.player.getLineup();
    curLineup.name = body.name;
    session.player.setLineup(curLineup);
    session.player.save();

    session.send("SetLineupNameScRsp", {
        retcode: 0,
        index: session.player.db.lineup.curIndex,
        name: body.name
    } as SetLineupNameScRsp);
}