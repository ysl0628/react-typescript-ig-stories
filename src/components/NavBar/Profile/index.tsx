type ProfileProps = {
  id: string;
  username?: string;
  url: string;
};
export default function Profile(props: ProfileProps) {
  return (
    <div className="content">
      <img src={props.url} alt="" />
    </div>
  );
}
