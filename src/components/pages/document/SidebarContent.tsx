// components/SidebarContent.js
const HomeContent = () => (
  <div>
    <h2>Home Content</h2>
    <p>This is the content for the Home option.</p>
  </div>
);

const LayoutContent = () => (
  <div>
    <h2>Layout Content</h2>
    <p>This is the content for the Layout option.</p>
  </div>
);

const SettingsContent = () => (
  <div>
    <h2>Settings Content</h2>
    <p>This is the content for the Settings option.</p>
  </div>
);

const Default = () => (
  <div>
    <h2>Defaulr Content</h2>
    <p>This is the content for the Settings option.</p>
  </div>
);

interface Props {
  option?: string;
}

const SidebarContent = ({ option }: Props) => {
  switch (option) {
    case "Home":
      return <HomeContent />;
    case "Gst":
      return <LayoutContent />;
    case "Board":
      return <SettingsContent />;
    default:
      return <Default />;
  }
};

export default SidebarContent;
