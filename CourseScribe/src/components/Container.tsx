function Container(props: any) {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
      {props.children}
    </div>
  );
}

export default Container;
