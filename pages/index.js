import useSWR from 'swr';
import fetch from 'unfetch';
import DataTable from 'react-data-table-component';

const apiUrl = 'https://api.covid19api.com/summary';
const timeSeriesUrl = 'https://pomber.github.io/covid19/timeseries.json';

const fetcher = url => fetch(url).then(r => r.json());

import columns from '../components/DataTableColumns';
import DataChart from '../components/DataChart';
import TimeSeriesChart from '../components/TimeSeriesChart';
import Loading from '../components/Loading';

const customStyle = {
  tableWrapper: {
    style: {
      display: 'block'
    }
  }
};

const IndexPage = () => {
  const { data, error } = useSWR(apiUrl, fetcher);
  const { data: timeseries } = useSWR(timeSeriesUrl, fetcher);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <p>Error...</p>;
  }

  const sortedData = data.Countries.sort((a, b) =>
    a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
  );

  return (
    <div className="container">
      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css?family=Comic+Neue&display=swap');

          * {
            font-family: 'Comic Neue', sans-serif;
          }

          .container {
            width: 820px;
            margin: 0 auto;
          }

          .title {
            text-align: center;
          }

          footer {
            text-align: center;
            padding: 2rem 0;
          }
        `}
      </style>
      <h2 className="title">COVID-19 Example with Next.js</h2>

      <DataTable
        title="COVID-19 Summary"
        customStyles={customStyle}
        columns={columns}
        data={sortedData}
        pagination={true}
      />

      <DataChart data={data.Countries} title="Summary" />

      <TimeSeriesChart data={timeseries.Thailand} title="Thailand Summary" />
      <TimeSeriesChart data={timeseries.US} title="US Summary" />
      <TimeSeriesChart data={timeseries.China} title="China Summary" />

      <footer>
        <p>
          <a
            href="https://github.com/Phonbopit/covid-19-nextjs-example"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
          {' by '}
          <a
            href="https://devahoy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Devahoy.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default IndexPage;
