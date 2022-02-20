import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter((user) =>
            JSON.stringify(user.profession) ===
            JSON.stringify(selectedProf))
        : allUsers;

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
                {count > 0 && (
                    <UsersTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        {...rest}
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
};
Users.propTypes = {
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

export default Users;
