import { Spinner, Container, SearchInput } from 'app/components';
import { FC, useState } from 'react';

import { WikiEmpty, WikiContent } from './components';
import { useWikiQuery } from './hooks';

const WikiLanding: FC = () => {
  const [query, setQuery] = useState('');
  const { data, meta, fetchNext, isLoading } = useWikiQuery(query);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex flex-col my-20 items-center h-full">
        <Container>
          <div className="row mt-8 mb-4">
            <div className="xl:col-6 col-8">
              <SearchInput
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
                onClear={() => setQuery('')}
              />
            </div>
          </div>
          {isLoading && (
            <div className="w-full h-screen flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {!data?.length ? (
            <div className="h-full w-full">
              <WikiEmpty />
            </div>
          ) : (
            <WikiContent
              meta={meta}
              data={data}
              isLoading={isLoading}
              fetchNext={fetchNext}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default WikiLanding;
