import { IServices } from 'src/services';
import { verifyRefreshToken, createAccessToken, sendRefreshToken, createRefreshToken } from './utils';

export default ({ User }: IServices) => async (req: any, res: any) => {
	const token = req.cookies.jid;
	if (!token) {
		return res.send({ ok: false, accessToken: '' });
	}
	try {
		const { userId, tokenVersion }: any = verifyRefreshToken(token);
		const user = await User.get(userId);

		if (!user || user.tokenVersion !== tokenVersion) {
			return res.send({ ok: false, accessToken: '' });
		}
		sendRefreshToken(res, createRefreshToken(user));
		return res.send({ ok: true, accessToken: createAccessToken(user) });
	} catch (err) {
		console.log(err);
		return res.send({ ok: false, accessToken: '' });
	}
};
