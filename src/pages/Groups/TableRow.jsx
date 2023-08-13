import {UserPlusIcon} from '@heroicons/react/24/outline';

function TableRow() {
    return (
    <tr>
        <th>1</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/src/assets/i8l.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Developers</div>
              <div className="text-sm opacity-50">Md.Admin's group</div>
            </div>
          </div>
        </td>
        <td>
          123456789
        </td>
        <td>5</td>
        <th>
        <button className="btn btn-accent">
            <UserPlusIcon className="h-6 w-6"/>
            Join
        </button>
        </th>
      </tr>
    )
}

export default TableRow;