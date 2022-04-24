import { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function useAutoCompleteController(debounce = 500) {
  const subjectRef = useRef(new Subject<string>());
  const subject = subjectRef.current;

  const [searchStr, setSearchStr] = useState<string>();

  useEffect(() => {
    const subscription = subject
      .pipe(debounceTime(debounce))
      .subscribe(setSearchStr);

    return () => {
      subscription.unsubscribe();
    };
  }, [debounce, subject]);

  return { searchStr, subject };
}
