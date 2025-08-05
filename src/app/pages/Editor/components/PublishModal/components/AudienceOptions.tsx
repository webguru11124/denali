import { useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import { useIsVisible } from 'app/hooks';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import SimpleTask from 'app/pages/ArticleEditor/components/blocks/SimpleTask';
import { ArrowDown2, Trash, UserSearch, UserTick } from 'iconsax-react';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';

const AudienceOptions = ({
  audienceId,
  removeAudience,
}: {
  audienceId: number;
  removeAudience: VoidFunction;
}) => {
  const [open, setOpen] = useState(false);

  const { t } = useArticlesTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);

  const isVisible = useIsVisible(buttonRef);

  const {
    nodes,
    actions: { setProp },
  } = useEditor((state, query) => ({
    nodes: query.getNodes(),
  }));

  useEffect(() => {
    if (!isVisible) setOpen(false);
  }, [isVisible]);

  const hasAction = () => {
    return Object.keys(nodes).some(
      (key) => nodes[key].data.displayName === 'SimpleTask'
    );
  };

  const audienceBelongsToAction = () => {
    return Object.keys(nodes)
      .map((key) => nodes[key])
      .filter((node) => node.data.displayName === 'SimpleTask')
      .some((simpleTask) =>
        simpleTask.data.props?.audiences?.includes(audienceId)
      );
  };

  const audienceTypeChange = (push: boolean) => {
    const taskIds = Object.keys(nodes)
      .map((key) => nodes[key])
      .filter((node) => node.data.displayName === 'SimpleTask')
      .map((simpleTask) => simpleTask.id);

    if (taskIds.length === 0) return;

    for (const id of taskIds) {
      setProp(id, (props: ComponentProps<typeof SimpleTask>) => {
        if (push) {
          props.audiences = [
            ...((props.audiences && props.audiences) ?? []),
            audienceId,
          ];
          return;
        }

        const filtered =
          props.audiences?.filter((audience) => audience !== audienceId) ?? [];

        props.audiences = filtered;
      });
    }
  };

  const options = [
    {
      title: t('Assignee'),
      description: t('Can complete actions'),
      onChange: () => audienceTypeChange(true),
      className: '',
      disabled: !hasAction(),
      checked: audienceBelongsToAction(),
    },
    {
      title: t('Viewer'),
      description: t('Can view published articles'),
      onChange: () => audienceTypeChange(false),
      className: 'mt-5',
      disabled: false,
      checked: !audienceBelongsToAction(),
    },
  ];

  return (
    <div className="ml-auto" ref={ref}>
      <Popover
        parentElement={ref.current?.parentElement ?? undefined}
        containerClassName="z-999"
        isOpen={open}
        positions={['bottom']}
        align="start"
        onClickOutside={() => setOpen(false)}
        content={
          <div className="border border-gray-light rounded shadow-atobi bg-white">
            <div className="flex-col pb-4 pt-5 mx-4 border-b border-gray-light">
              {options.map((opt) => {
                const {
                  title,
                  description,
                  className,
                  disabled,
                  checked,
                  onChange,
                } = opt;
                return (
                  <div className={cx('flex', className)} key={title}>
                    <input
                      disabled={disabled}
                      onChange={() => onChange()}
                      type="radio"
                      className="filter-radio w-5 h-5 accent-focus"
                      id={title}
                      value={title}
                      checked={checked}
                    />

                    <div className="flex flex-col ml-3">
                      <label
                        htmlFor={title}
                        className={cx('text-sm', {
                          'text-black': !disabled,
                          'text-gray-dark': disabled,
                        })}
                      >
                        {title}
                      </label>
                      <span
                        className={cx('text-sm', {
                          'text-grayscale-secondary': !disabled,
                          'text-gray-dark': disabled,
                        })}
                      >
                        {description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4.5 py-2 text-error text-sm">
              <button className="flex" onClick={removeAudience}>
                <Trash size={20} />
                <span className="ml-2">{t('Remove audience')}</span>
              </button>
            </div>
          </div>
        }
      >
        <button
          className="flex items-center justify-center w-[132px] h-8 bg-hover-blue text-focus rounded text-sm border-transparent"
          onClick={() => setOpen((prev) => !prev)}
        >
          {audienceBelongsToAction() ? (
            <>
              <UserTick size={16} className="ml-auto mr-2" />
              <span ref={buttonRef}>{t('Assignee')}</span>
            </>
          ) : (
            <>
              <UserSearch size={16} className="ml-auto mr-2" />
              <span ref={buttonRef}>{t('Viewer')}</span>
            </>
          )}

          <div className="ml-auto mr-3">
            <ArrowDown2
              size={16}
              className={cx('transform', { 'rotate-180': open })}
            />
          </div>
        </button>
      </Popover>
    </div>
  );
};

export default AudienceOptions;
