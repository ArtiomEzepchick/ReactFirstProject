import React from "react"
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'

const UserList = (props) => {
    const { users, children } = props

    return (
        <React.Fragment>
            <div className="site-card-wrapper">
                <Row gutter={50}>
                    {users.map((user, index) => {
                        return <Col span={8} key={user.id || `${user.name}: ${index}`}>
                            <Card title={user.surname}>
                                {user.name}
                            </Card>
                        </Col>
                    })}
                </Row>
            </div>
            {children}
        </React.Fragment>
    )
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number
    })).isRequired
}

export default UserList