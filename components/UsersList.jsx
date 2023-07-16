import {List} from '@chakra-ui/react'
import {UserTag} from '@/components/UserTag'

export const UsersList = ({users = [], onSelect, selectUserId}) => {
    return(
        <List display="flex" flexWrap="wrap" gap={2}>
            {users.map((u) => (
                <UserTag
                    key={u.id}
                    user={u}
                    selectUserId={selectUserId}
                    onSelect={onSelect}
                />
            ))}
        </List>
    )
}
