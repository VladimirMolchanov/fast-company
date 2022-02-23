import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import Search from "../../common/search";

const UserListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");
    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        let cleanup = false;
        api.users.fetchAll().then((data) => {
            if (!cleanup) setUsers(data);
        });
        return () => (cleanup = true);
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        let cleanup = false;
        api.professions.fetchAll().then((data) => {
            if (!cleanup) setProfessions(data);
        });
        return () => (cleanup = true);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = item => {
        setSearch("");
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = (search) => {
        setSelectedProf();
        setSearch(search);
    };

    const filter = () => {
        if (selectedProf) {
            return users.filter((user) =>
                JSON.stringify(user.profession) ===
                JSON.stringify(selectedProf));
        }
        if (search) {
            return users.filter((user) => {
                const s = user.name.toLowerCase().match(search.toLowerCase());
                return s && s.length !== 0;
            });
        }
        return users;
    };

    if (users) {
        const filteredUsers = filter();

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf(null);
        };

        return (
            <div className="d-flex">
                {professions &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <Search onSearch={handleSearch} value={search}/>
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return "Loading...";
    }
};
UserListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        profession: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string
        }),
        qualities: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string,
            color: PropTypes.string
        })),
        completedMeetings: PropTypes.number,
        rate: PropTypes.number,
        bookmark: PropTypes.bool
    }))
};

export default UserListPage;
