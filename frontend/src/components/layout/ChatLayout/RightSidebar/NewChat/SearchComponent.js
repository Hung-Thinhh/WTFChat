
import { useEffect } from "react";
import Search from "../Footer/Search";
import findUser from 'services/findUserService';
import useDebounce from 'hooks/useDebounce';
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
const cx = classNames.bind(styles);

const SearchComponent = ({ searchData, setSearchData, setFindData }) => {
    const handleSearchChange = async (e) => {
        const data = { text: e.target.value };
        if (!data.text) {
            setFindData([]);
            setSearchData('');
        } else {
            setSearchData(data.text);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!searchData) return;
            const res = await findUser({ text: searchData });
            setFindData(res.DT);
        };
        fetchData();
    }, [useDebounce(searchData, 500)]);

    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === 'Enter') {
                const fetchData = async () => {
                    if (!searchData) return;
                    const res = await findUser({ text: searchData });
                    setFindData(res.DT);
                };
                fetchData();
            }
        };

        window.addEventListener('keydown', handleEnterKey);
        return () => {
            window.removeEventListener('keydown', handleEnterKey);
        };
    }, [searchData]);

    return (
        <Search
            value={searchData}
            onChange={handleSearchChange}
            className={cx('search')}
            isMulti
        />
    );
};

export default SearchComponent;