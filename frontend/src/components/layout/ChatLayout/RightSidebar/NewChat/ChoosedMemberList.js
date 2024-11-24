
import Chip from "./Chip";
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
const cx = classNames.bind(styles);

const ChoosedMemberList = ({ choosedMember, handleClickMember }) => {
    const getRandomLightColor = () => {
        const letters = 'BCDEF'; // Exclude 'A' to avoid darker colors
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    };

    return (
        <div className={cx('choosedmember')}>
            {choosedMember.map((item) => (
                <Chip
                    color={getRandomLightColor()}
                    key={item.id}
                    name={item.name}
                    handleDelete={(e) => handleClickMember({ ...item, checked: true })}
                />
            ))}
        </div>
    );
};

export default ChoosedMemberList;