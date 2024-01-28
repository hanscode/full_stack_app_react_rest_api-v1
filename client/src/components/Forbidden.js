/**
 * Displays a message letting the user know they can't access the requested page.
 * @returns A forbidden "permissions denied" message.
 */

const Forbidden = () => (
    <div className="wrap">
        <h2>Forbidden</h2>
        <p>You don't have permission to access this resource.</p>
    </div>
);

export default Forbidden;