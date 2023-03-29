import classes from "./Paginator.module.css";

function Paginator(props) {
  const pageNumbers = [];

  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={classes.pagination}>
        <li onClick={() => props.paginate(1)} className={classes.pagenumber}>
          First
        </li>
        <li onClick={props.previousPage} className={classes.pagenumber}>
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={classes.pagenumber}
          >
            {number}
          </li>
        ))}
        <li onClick={props.nextPage} className={classes.pagenumber}>
          Next
        </li>
        <li
          onClick={() => props.paginate(pageNumbers.length)}
          className={classes.pagenumber}
        >
          Last
        </li>
      </ul>
    </div>
  );
}

export default Paginator;
