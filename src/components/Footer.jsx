function Footer() {
  return (
    <footer className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
      <p>Discover. Book. Experience.</p>
      <p className="mt-1">&copy; {new Date().getFullYear()} Eventora. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
