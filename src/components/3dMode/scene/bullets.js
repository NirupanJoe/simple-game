import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import BulletModel from '../model/bullet';

const Bullets = (context) => {
	const { state: { bullets }} = context;
	const enrichedBullets = bullets.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedBullets, 'bullet').map((animationData, i) =>
			BulletModel({
				...context,
				data: { ...enrichedBullets[i], ...animationData },
			}))
	);
};

export default Bullets;
