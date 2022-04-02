import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import Search from "../../common/search";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/profession";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UserListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");
    const pageSize = 8;

    const currentUserId = useSelector(getCurrentUserId());

    const users = useSelector(getUsersList());

    const handleDelete = (userId) => {};

    const handleToggleBookMark = (userId) => {};

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
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

    const filter = (data) => {
        if (selectedProf) {
            return data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf));
        }
        if (search) {
            return data.filter((user) => {
                const s = user.name.toLowerCase().match(search.toLowerCase());
                return s && s.length !== 0;
            });
        }
        return data.filter((u) => u._id !== currentUserId);
    };

    if (users) {
        const filteredUsers = filter(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf(null);
        };
        return (
            <div className="d-flex">
                {!professionsLoading && professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <Search onSearch={handleSearch} value={search} />
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
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string,
            profession: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string
            }),
            qualities: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string,
                    color: PropTypes.string
                })
            ),
            completedMeetings: PropTypes.number,
            rate: PropTypes.number,
            bookmark: PropTypes.bool
        })
    )
};

export default UserListPage;
